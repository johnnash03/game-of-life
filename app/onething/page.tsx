import Link from "next/link";
import { getStrategies } from "./strategy/queries";
const getData = async () => {
  const data = await getStrategies();
  return data;
};
const Onething = async () => {
  const { strategiesrel: strategies } = await getData();
  return (
    <ul>
      {strategies.map(({ id, name }) => {
        return (
          <li key={id}>
            <Link href={`onething/strategy/${id}`}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Onething;
