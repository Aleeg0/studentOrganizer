import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "swr-cache" });

const getCache = () => {
  const json = storage.getString("swr-cache");
  return json ? new Map(JSON.parse(json)) : new Map();
};
