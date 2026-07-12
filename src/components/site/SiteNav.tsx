// Visual-only wrapper kept for API compatibility.
// The unified header/drawer visuals now live in halden-ui's SiteNavigation.
export function SiteNav({
  variant = "horizontal",
}: {
  variant?: "horizontal" | "vertical";
}) {
  // Consumers still pass this component in some legacy places.
  // We intentionally render nothing to avoid duplicate visual chrome.
  // (Navigation is handled by SiteHeader + MobileDrawer.)
  return <div className={variant === "vertical" ? "md:hidden" : "md:flex"} />;
}



