class SkeletonState {
  dirty: boolean;

  constructor() {
    this.dirty = false;
  }

  setState(value: boolean) {
    this.dirty = value;
  }

  getState() {
    return this.dirty;
  }
}

export default SkeletonState;