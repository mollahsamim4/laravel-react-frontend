import { forwardRef, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const SinglePost = forwardRef(({ post, index, handlePopupClic }, ref) => {
  const { id, title, body, created_at, updated_at, user, categories } = post;
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState(null);

  const customRef = useRef();

  //   useImperativeHandle(
  //     ref,
  //     () => {
  //       return {
  //         getData: () => ref.current,
  //       };
  //     },
  //     []
  //   );

  const clickBtn = () => {
    handlePopupClick(id, customRef, categories);

    setShowPopup();
  };
  return (
    <tr
      className={`relative border-slate-500 ${
        index % 2 == 0 ? "bg-gray-200" : ""
      }`}
      ref={ref}
    >
      <td>
        {name}
        <button
          ref={customRef}
          className="bg-green-600 px-2 py-1 font-lato text-gray-800 font-semibold flex  items-center justify-between text-sm focus:bg-green-700 focus:text-gray-200 focus:font-medium"
          onClick={clickBtn}
        >
          <span>Actions</span> <FaCaretDown />
        </button>
      </td>
      <td className="border-r border-none border-slate-500 px-2 py-1">{id}</td>
      <td className="border-r border-none border-slate-500 px-2 py-1">
        {title}
      </td>
      <td className="border-r border-none border-slate-500 px-2 py-1">
        {body}
      </td>
      <td>
        {categories.length !== 0
          ? categories.map((item) => {
              return <span key={item.id}>{item.name}</span>;
            })
          : ""}
      </td>
      <td className="border-r border-none border-slate-500 px-2 py-1">
        {user?.name}
      </td>
      <td className="px-2 py-1">{created_at}</td>
      <td className="px-2 py-1">{updated_at}</td>
    </tr>
  );
});

export default SinglePost;
