import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import ProgressBar from "../components/ProgressBar";
import TodoItem from "../components/TodoItem";

export default function TodosScreen() {
  const { theme } = useTheme();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // load
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("@todos");
      if (raw) setTodos(JSON.parse(raw));
    })();
  }, []);

  // save
  useEffect(() => {
    AsyncStorage.setItem("@todos", JSON.stringify(todos));
  }, [todos]);

  const completed = useMemo(() => todos.filter((t) => t.done).length, [todos]);
  const progress = todos.length ? completed / todos.length : 0;

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos([{ id: Date.now().toString(), title: t, done: false }, ...todos]);
    setText("");
  };

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const del = (id) => setTodos(todos.filter((t) => t.id !== id));

  // edit handlers
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };
  const saveEdit = () => {
    if (!editingId) return;
    const title = editingText.trim();
    if (!title) return;
    setTodos(todos.map((t) => (t.id === editingId ? { ...t, title } : t)));
    setEditingId(null);
    setEditingText("");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const clearCompleted = () => setTodos(todos.filter((t) => !t.done));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        {/* header */}
        <Text style={[styles.title, { color: theme.text }]}>Today&apos;s Tasks 👀</Text>
        <Text style={{ color: theme.textMuted, marginBottom: 10 }}>
          {completed} of {todos.length || 0} completed
        </Text>

        <ProgressBar progress={progress} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text style={{ color: theme.accent, fontWeight: "700" }}>
            {Math.round(progress * 100)}%
          </Text>
          <TouchableOpacity onPress={clearCompleted}>
            <Text style={{ color: theme.accent, fontWeight: "700" }}>Clear completed</Text>
          </TouchableOpacity>
        </View>

        {/* input row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 16,
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.inputBg,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          >
            <TextInput
              placeholder="What needs to be done?"
              placeholderTextColor={theme.textMuted}
              value={text}
              onChangeText={setText}
              onSubmitEditing={add}
              style={{ color: theme.text, fontSize: 16 }}
            />
          </View>
          <TouchableOpacity
            onPress={add}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24, lineHeight: 24 }}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* list */}
        <FlatList
          data={todos}
          keyExtractor={(t) => t.id}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 12 }}>
              {editingId === item.id ? (
                // EDITING UI
                <View
                  style={{
                    backgroundColor: theme.card,
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <TextInput
                    value={editingText}
                    onChangeText={setEditingText}
                    onSubmitEditing={saveEdit}
                    autoFocus
                    placeholder="Edit task…"
                    placeholderTextColor={theme.textMuted}
                    style={{ color: theme.text, fontSize: 16 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginTop: 12,
                      gap: 8,
                    }}
                  >
                    <TouchableOpacity onPress={cancelEdit} style={{ padding: 8 }}>
                      <Text style={{ color: theme.textMuted }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={saveEdit}
                      style={{
                        backgroundColor: theme.accent,
                        paddingVertical: 8,
                        paddingHorizontal: 14,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // NORMAL VIEW
                <TodoItem
                  item={item}
                  onToggle={toggle}
                  onDelete={del}
                  onEditPress={startEdit}
                />
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 24, color: theme.textMuted }}>
              Nothing yet. Add your first task!
            </Text>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  title: { fontSize: 28, fontWeight: "800", marginTop: 6 },
});