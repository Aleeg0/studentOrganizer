import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Employee, Lesson } from "@entities/lessons";
import styles from "./lessonCard.styles";
import { Colors, useColorScheme } from "@/shared/theme";
import { getColorByLessonType } from "./lib";

interface Props {
  subject: Lesson["subject"];
  auditories: Lesson["auditories"];
  startTime: Lesson["startLessonTime"];
  endTime: Lesson["endLessonTime"];
  note: Lesson["note"];
  photoLink?: Employee["photoLink"];
  type: Lesson["lessonTypeAbbrev"];
}

export default function LessonCard({
  startTime,
  endTime,
  note,
  auditories,
  subject,
  photoLink,
  type,
}: Props) {
  const [theme] = useColorScheme();
  const auditory = auditories?.[0];
  const color = getColorByLessonType(type);
  return (
    <View
      style={[styles.content, { backgroundColor: Colors[theme].secondary }]}
    >
      <View style={styles.leftPart}>
        <View style={styles.times}>
          <Text
            style={[styles.startTime, { color: Colors[theme].textPrimary }]}
          >
            {startTime}
          </Text>
          <Text style={[styles.endTime, { color: Colors[theme].textPrimary }]}>
            {endTime}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: color }]} />
        <View>
          <Text style={[styles.title, { color: Colors[theme].textPrimary }]}>
            {subject}
          </Text>
          {auditory && <Text style={styles.description}>{auditory}</Text>}
          {note && <Text style={styles.description}>{note}</Text>}
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: photoLink,
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}
