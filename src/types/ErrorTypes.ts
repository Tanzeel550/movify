// ============================================================
// ======================= Error Types ========================
// ============================================================

export type ErrorState = {
  message: string;
  title: string;
};

export type ErrorActionsReturnType = {
  type: 'SET_ERROR' | 'CLEAR_ERROR';
  message?: string;
  title?: string;
};
