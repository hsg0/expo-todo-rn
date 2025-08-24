import { Switch, Text, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function Settings() {
  const { theme, isDarkMode, setIsDarkMode } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 16, paddingTop: 48 }}>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        Appearance
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.card,
          borderRadius: 14,
          padding: 16,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Text style={{ color: theme.text, fontSize: 16 }}>Dark mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>
      {/* You can add more settings options here */}
    </View>
  );
}