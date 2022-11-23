class State {
  constructor() {
    this.user = null;
    this.current_visit = null;
  }
  get_user() {
    return this.user;
  }
  set_user(user) {
    this.user = user;
  }
  set_visit(visit_id) {
    this.current_visit = visit_id;
  }
  get_visit() {
    return this.current_visit
  }
}

const NewState = new State();

export default NewState;
