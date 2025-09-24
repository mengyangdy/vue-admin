declare namespace CommonType {
  interface StrategicPattern {
    condition: boolean;
    callback: () => void;
  }
  type Option<K = string, M = string> = { value: K; label: M };

  type YesOrNo = "Y" | "N";

  /** add null to all properties */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null;
  };
}
