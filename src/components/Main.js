import { useState } from "react";
import Item from "./Item";
import Popup from "./Popup";

export default function Main({ addItem }) {
  const [items, setItems] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [edit, setEdit] = useState(null);
  const [inputTitleEdit, setInputTitleEdit] = useState("");
  const [inputTextEdit, setInputTextEdit] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const addButton = document.querySelector(".field__button");
  const titleField = document.querySelector(".field__input-title");
  const textField = document.querySelector(".field__input-text");

  //добавление задачи
  function addItem(itemInput) {
    if (itemInput) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        title: titleInput,
        text: textInput,
        complete: false,
        progress: false,
      };
      setItems([newItem, ...items]);
    }
  }

  const filteredItems = items.filter((item) => {
    return item.title.toLowerCase().includes(searchInput.toLowerCase())
  })

  //инпут заголовка
  function handleTitleChange(e) {
    setTitleInput(e.target.value);
  }

  //инпут содержимого
  function handleTextChange(e) {
    setTextInput(e.target.value);
  }

  //инпут поиска
  function handleItemSearch(e) {
    setSearchInput(e.target.value);
  }

  function handleTitleEditInput(e) {
    setInputTitleEdit(e.target.value);
  }

  function handleTextEditInput(e) {
    setInputTextEdit(e.target.value);
  }

  function handleItemClick(item) {
    setSelectedItem(item);
    setIsPopupOpen(true);

  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  //самбит задачи
  function handleSubmit(e) {
    e.preventDefault();
    addItem(titleInput, textInput);
    setTitleInput("");
    setTextInput("");
  }
  

  //самбит по кнопке Enter для добавления задач
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  //самбит по кнопке Enter для редактирования задач
  function handleEditKeyPress(e) {
    if (e.key === "Enter") {
      handleItemSave(e);
    }
  }

  //функция удаления задачи
  function handleItemDelete(id) {
    setItems([...items.filter((item) => item.id !== id)]);
  }
  //функция выполнения задачи
  function handleItemDone(id) {
    setItems([
      ...items.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : { ...item }
      ),
    ]);
  }
  //функция прогресса задачи
  function handleItemProgress(id) {
    setItems([
      ...items.map((item) =>
        item.id === id ? { ...item, progress: !item.progress } : { ...item }
      ),
    ]);
  }

  //функция редактирования задачи
  function handleItemEdit(id, title, text) {
    setEdit(id);
    setTitleInput(title);
    setTextInput(text);
    addButton.setAttribute("disabled", true);
    addButton.classList.add("field__button_disabled");
    titleField.setAttribute("disabled", true);
    textField.setAttribute("disabled", true);
  }

  //функция сохранения после редактирования задачи
  function handleItemSave(id) {
    setItems(
      [...items].map((item) => {
        if (item.id == id) {
          item.title = inputTitleEdit;
          item.text = inputTextEdit;
        }
        return item;
      })
    );
    setEdit(null);

    addButton.removeAttribute("disabled", true);
    addButton.classList.remove("field__button_disabled");
    titleField.removeAttribute("disabled", true);
    textField.removeAttribute("disabled", true);
  }

  return (
    <main className="content">
      <section className="list">
        <form className="list__form">
          <label className="list__label">Search:</label>
          <input
            className="list__input"
            type="search"
            name="search"
            placeholder="Search task..."
            onChange={handleItemSearch}
          />
        </form>
        <div className="items">
        {filteredItems?.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              handleItemEdit={handleItemEdit}
              handleItemSave={handleItemSave}
              handleItemDelete={handleItemDelete}
              handleItemDone={handleItemDone}
              handleItemProgress={handleItemProgress}
              handleItemClick={handleItemClick}
              editTitle={
                edit == item.id ? (
                  <input
                    className="item__edit-input"
                    onChange={handleTitleEditInput}
                    onKeyDown={handleEditKeyPress}
                    value={inputTitleEdit || item.title}
                  />
                ) : (
                  item.title
                )
              }
              editText={
                edit == item.id ? (
                  <textarea
                    className="item__edit-textarea"
                    onChange={handleTextEditInput}
                    value={inputTextEdit || item.text}
                  />
                ) : (
                  item.text
                )
              }
              saveButtonBox={
                edit == item.id ? (
                  <button
                    className="item__save-button"
                    onClick={() => handleItemSave(item.id)}
                  >
                  </button>
                ) : (
                  <>
                    <button
                      className="item__edit-button"
                      type="button"
                      onClick={() => handleItemEdit(item.id)}
                    ></button>
                    <button
                      className="item__delete-button"
                      type="button"
                      onClick={() => handleItemDelete(item.id)}
                    ></button>
                    <button
                      className="item__done-button"
                      type="button"
                      onClick={() => handleItemDone(item.id)}
                    ></button>
                    <button
                      className="item__progress-button"
                      type="button"
                      onClick={() => handleItemProgress(item.id)}
                    ></button>
                      <button
                      className="item__full-button"
                      type="button"
                      onClick={() => handleItemClick(item)}
                    ></button>
                  </>
                )
              }
            />
          );
        })}
        </div>
      </section>
      <section className="field">
        <form className="field__form" onSubmit={handleSubmit}>
          <fieldset className="field__form-fieldset">
            <label className="field__label">Title:</label>
            <input
              className="field__input-title"
              type="text"
              name="field"
              minLength={1}
              value={titleInput || ""}
              onChange={handleTitleChange}
              onKeyDown={handleKeyPress}
              placeholder="Type title..."
              required
            />
            <label className="field__label">Text:</label>
            <textarea
              className="field__input-text"
              type="text"
              name="field"
              value={textInput || ""}
              onChange={handleTextChange}
              onKeyDown={handleKeyPress}
              placeholder="Type text..."
              required
            />
          </fieldset>
          <button className="field__button" type="submit">
          </button>
        </form>
      </section>
      <Popup isOpen={isPopupOpen} item={selectedItem} onClose={closePopup} />
    </main>
  );
}
