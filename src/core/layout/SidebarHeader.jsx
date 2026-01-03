export default function SidebarHeader({ greeting, centreName }) {
  return (
    <div className="flex h-full flex-col justify-start py-6">
      <div className="text-sm text-text-secondary">{greeting}</div>
      <div className="mt-2 text-[13px] text-text-tertiary">{centreName}</div>
    </div>
  );
}
