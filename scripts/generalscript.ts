import { addLiq } from "./functionA";
import { removeLiq } from "./functionB";
import { getLiqValue } from "./getLiquidityValue";

export async function main() {
  let pairVal;
  let pairAdd;
  await addLiq().then((res) => getLiqValue(res).then((res) => (pairVal = res?.pairLiqVal, pairAdd = res?.address)));
  await removeLiq(pairVal, pairAdd);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
