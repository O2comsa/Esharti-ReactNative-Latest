import { meetingProps } from "./meeting";

export type liveEventProps = {
  id: number;
  is_paid: boolean;
  price: null | number;
  event_at: string;
  duration_event: string;
  event_presenter: string;
  name: string;
  description: string;
  agenda: any[];
  status: string;
  image: null | string;
  meeting_info: meetingProps | null;
  purchased: boolean;
  is_seat_available: boolean;
};
