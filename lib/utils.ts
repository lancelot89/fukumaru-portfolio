// classNameを結合する簡易ユーティリティ（shadcn/uiのcn相当）
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
