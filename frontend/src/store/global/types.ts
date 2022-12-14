import { ComputedRef } from 'vue';

export interface GlobalState {
  isLoading: boolean
  isError: boolean
}

export interface GlobalModule {
  isLoading: ComputedRef<boolean>
  isError: ComputedRef<boolean>
  setLoader: (value: boolean) => void
  setError: (value: boolean) => void
}
