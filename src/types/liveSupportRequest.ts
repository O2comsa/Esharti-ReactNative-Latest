import { meetingProps } from "./meeting";

export type liveSupportRequestProps = {
  id: number;
  plan_id: number;
  status: "completed" | "in-progress" | "waiting" | "canceled";
  admin_id: null;
  user_id: number;
  meeting_info: meetingProps;
};
