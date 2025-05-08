import { FC } from "react";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { CalenderIcon, TimeIcon, UserIcon } from "../../../components/SvgIcons";
import { Badge } from "../../courses";
import Moment from "moment";
import "moment/locale/ar";
type InformationCardProps = {
  date: string;
  presenter: string;
};

const InformationCard: FC<InformationCardProps> = ({ date, presenter }) => {
  Moment.locale("ar");
  return (
    <View className="bg-[#FFFBEF]  rounded-xl w-full p-[10px] flex-col gap-y-[7px]">
      <View className="flex-row items-center space-x-[6px]">
        <CalenderIcon />
        <Text className="text-primary" fontWeight="400">
          التاريخ:
        </Text>
        <Text fontWeight="400">
          {Moment(date).format("dddd")} - {Moment(date).format("DD/MM/YYYY")}
        </Text>
        <View>
          <Badge
            variant="outline"
            title={Moment(date).startOf("day").fromNow()}
            borderColor="#525252"
            fontSize={10}
          />
        </View>
      </View>
      <View className="flex-row items-center space-x-[6px]">
        <TimeIcon stroke={"#EBA800"} height={15} width={15} />
        <Text className="text-primary" fontWeight="400">
          الوقت:
        </Text>
        <Text fontWeight="400">{Moment(date).format("hh:mm A")}</Text>
      </View>
      <View className="flex-row items-center space-x-[6px]">
        <UserIcon stroke={"#EBA800"} height={15} width={15} />
        <Text className="text-primary" fontWeight="400">
          المقدم:
        </Text>
        <Text fontWeight="400">{presenter}</Text>
      </View>
    </View>
  );
};

export default InformationCard;
