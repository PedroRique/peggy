import React from "react";
import { Text } from "./Text";
const Emoji = (props: { symbol: string; label: string }) => (
  <Text>{props.symbol}</Text>
);
export default Emoji;
