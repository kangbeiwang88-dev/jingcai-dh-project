import { VerifyStatus } from "../../data/resources";

type BadgeStatus = VerifyStatus | "\u5b98\u65b9\u4fe1\u606f" | "\u9700\u6838\u9a8c";

export default function Badge({ status }: { status: BadgeStatus }) {
  const officialStatuses: BadgeStatus[] = ["\u5b98\u65b9\u6765\u6e90", "\u5b98\u65b9\u4fe1\u606f", "\u5df2\u6838\u9a8c"];
  const tone = officialStatuses.includes(status)
    ? "bg-[#e8f4ef] text-accessible"
    : status === "Mock\u793a\u4f8b"
      ? "bg-[#fff0d8] text-verify"
      : "bg-[#fde8e8] text-cinnabar";

  return <span className={`rounded-full px-3 py-1 text-xs font-black whitespace-nowrap ${tone}`}>{status}</span>;
}
