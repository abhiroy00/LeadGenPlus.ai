import TriggerNode from "./nodes/TriggerNode";
import MessageNode from "./nodes/MessageNode";
import DelayNode from "./nodes/DelayNode";
import ConditionNode from "./nodes/ConditionNode";
import GoalNode from "./nodes/GoalNode";

export {
  TriggerNode,
  MessageNode,
  DelayNode,
  ConditionNode,
  GoalNode,
};

export const NODE_TYPES = {
  trigger: {
    label: "Trigger",
    icon: "⚡",
    bg: "bg-blue-50",
    text: "text-blue-600",
    color: "border-blue-200",
  },
  message: {
    label: "Message",
    icon: "💬",
    bg: "bg-green-50",
    text: "text-green-600",
    color: "border-green-200",
  },
  delay: {
    label: "Delay",
    icon: "⏱️",
    bg: "bg-amber-50",
    text: "text-amber-600",
    color: "border-amber-200",
  },
  condition: {
    label: "Condition",
    icon: "🔀",
    bg: "bg-purple-50",
    text: "text-purple-600",
    color: "border-purple-200",
  },
  goal: {
    label: "Goal",
    icon: "🎯",
    bg: "bg-rose-50",
    text: "text-rose-600",
    color: "border-rose-200",
  },
};