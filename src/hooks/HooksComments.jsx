import { useReducer, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import "./HooksComments.scss";

import sleep from "../utils/sleep";

export default function HooksComments({ referenceId }) {
  const { comments, loadComments } = useComments();

  useEffect(() => {
    loadComments(referenceId);
  }, [referenceId, loadComments]);

  const commentElements = comments.map((comment) => {
    return <li key={comment.id}>{comment.text}</li>;
  });

  return <ul>{commentElements}</ul>;
}

HooksComments.propTypes = {
  referenceId: PropTypes.string.isRequired,
};

function useComments() {
  const [state, dispatch] = useReducer(commentsReducer, {
    comments: [],
    fetching: false,
    fetched: false,
    failed: false,
  });

  const loadComments = useCallback(async (referenceId) => {
    dispatch({ fetching: true, failed: false });
    try {
      await sleep(3000);

      const comments = [
        {
          id: "abc",
          text: "Hello, " + referenceId,
        },
        {
          id: "def",
          text: "Coucou",
        },
        {
          id: "ghi",
          text: "Barlou",
        },
      ];

      dispatch({ comments });
    } catch (e) {
      dispatch({ failed: true, fetched: true });
    } finally {
      dispatch({ fetching: false, fetched: true });
    }
  }, []);

  return {
    comments: state.comments,
    loadComments,
  };
}

function commentsReducer(state, updatedState) {
  return { ...state, ...updatedState };
}
