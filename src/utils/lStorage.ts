export default function lStorage(key: string, data: any = null): any {
  if (typeof window === "undefined") {
    return null;
  }
  if (!data) {
    if (JSON.parse(localStorage.getItem(key)!)) {
      return JSON.parse(localStorage.getItem(key)!);
    }
    return null;
  }
  localStorage.setItem(key, JSON.stringify(data));
}
