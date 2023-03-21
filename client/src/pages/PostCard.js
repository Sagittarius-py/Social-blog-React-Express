import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const LikePost = (id) => {
  const [cookies, setCookies, removeCookie] = useCookies();

  let userId = { userId: cookies.userId };
  Axios.post(`https://mysql-deploy.herokuapp.com/api/like/${id}`, userId).then(
    (response) => {
      console.log(response);
    }
  );
  window.location.reload(false);
};

export default function PostCard(props) {
  const [cookies, setCookies, removeCookie] = useCookies();

  let history = useHistory();
  return (
    <div className="w-2/4 mx-auto my-8 overflow-hidden rounded-lg dark:bg-neutral-900 bg-gray-50 shadow-2xl shadow-slate-400 h-fit dark:shadow-slate-900">
      <img
        src={`https://mysql-deploy.herokuapp.com/images/${props.imageLink}`}
        className="object-cover w-full cursor-pointer aspect-video"
        alt=""
        onClick={() => history.push(`/post/${props.id}`)}
      />
      <div className="p-4">
        <p className="mb-1 text-sm text-primary-500 dark:text-blue-100">
          <a
            href={`http://mysql-deploy.herokuapp.com/profile/${props.postCreatorID}`}
          >
            {props.postCreator}
          </a>{" "}
          | <time>18 Nov 2022</time>
        </p>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {props.postTitle}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-zinc-200">
          {props.postText.substring(0, 300) + " ..."}
        </p>
        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-blue-600 rounded-full bg-blue-50 dark:text-white dark:bg-blue-800">
            Likes: {props.postLikes}
          </span>
          {cookies.loggedIn ? (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-indigo-600 rounded-full cursor-pointer bg-indigo-50  dark:text-white dark:bg-indigo-800"
              onClick={() => LikePost(props.id)}
            >
              Like this post!
            </span>
          ) : null}
        </div>
        <div className="flex gap-2 mt-4"></div>
      </div>
    </div>
  );
}
