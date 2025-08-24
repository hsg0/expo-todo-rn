import { View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function ProgressBar({ progress = 0 }) {
  const { theme } = useTheme();
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={{
        height: 10,
        backgroundColor: theme.progressTrack,
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: `${pct * 100}%`,
          height: "100%",
          backgroundColor: theme.progressFill,
        }}
      />
    </View>
  );
}