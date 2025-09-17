declare namespace UnionKey {
  type ThemeScheme = "light" | "dark" | "auto";
  type ThemeLayoutMode =
    | "vertical"
    | "horizontal"
    | "sidebar"
    | "mixed-sidebar"
    | "full-content"
    | "two-column"
    | "mixed-two-column";

  type ThemeScrollMode = "wrapper" | "content";
  type ThemePageAnimateMode =
    | "fade"
    | "fade-slide"
    | "fade-bottom"
    | "fade-scale"
    | "zoom-fade"
    | "zoom-out"
    | "none";

  type PageTabMode = "button" | "chrome";
}
