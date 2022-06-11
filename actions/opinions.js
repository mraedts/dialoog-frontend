export const modifyOpinion = (opinion)  => (
    {
      type: 'MODIFY_OPINION',
      payload: opinion,
    }
  );

export const removeAllOpinions = (opinion)  => (
    {
        type: 'REMOVE_ALL_OPINIONS',
        payload: opinion,
    }
);

export const setOpinions = (opinions) => (
    {
        type: 'SET_OPINIONS',
        payload: opinions
    }
)