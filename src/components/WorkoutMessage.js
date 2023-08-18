function WorkoutMessage() {
  //Show message to give info to  user on when last workout was, how long it took, if they need to unload weight, if they failed any reps, if they haven't worked out for a while, etc
  return (
    <div className="mx-12 my-40">
      Welcome back! Your last workout was Workout B on *date* and you completed
      your workout in *time-elapsed* hours/minutes. Keep up the good work!
    </div>
  );
}

export default WorkoutMessage;
