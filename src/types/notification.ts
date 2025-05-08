export type notificationProps = {
  id: string;
  data: {
    title: string;
    body: string;
    related_type: string;
    related_id: string;
  };
  type: string;
  read_at: string;
};
