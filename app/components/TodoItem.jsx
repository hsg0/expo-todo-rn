import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function TodoItem({ item, onToggle, onDelete, onEditPress }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* checkbox */}
        <TouchableOpacity
          onPress={() => onToggle(item.id)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: theme.textMuted,
            marginRight: 10,
            backgroundColor: item.done ? theme.accent : "transparent",
          }}
        />
        <Text
          style={{
            flex: 1,
            color: theme.text,
            fontSize: 16,
            textDecorationLine: item.done ? "line-through" : "none",
            opacity: item.done ? 0.6 : 1,
          }}
        >
          {item.title}
        </Text>

        {/* edit */}
        <TouchableOpacity
          onPress={() => onEditPress?.(item)}
          style={{
            backgroundColor: theme.warn,
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 10,
            marginRight: 8,
          }}
        >
          <Text style={{ color: "#1b1b1b", fontWeight: "700" }}>✎</Text>
        </TouchableOpacity>

        {/* delete */}
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={{
            backgroundColor: theme.danger,
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}