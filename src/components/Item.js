export default function Item({
  item,
  editTitle,
  editText,
  saveButtonBox
}) {


  return (
    <div
      key={item.id}
    className= {item.complete ? "item_type_done" : "item" && item.progress ? "item_type_progress" : "item"}
    >
      <div className="item__text-container">
        <h3 className="item__title">{editTitle}</h3>
        <span className="item__text">{editText}</span>
      </div>
      <div className="item__box-button"> {saveButtonBox} 
      </div>
    </div>
  );
}
