import axios from './api/axios'
import { useEffect, useState } from 'react'
import Item from './components/item/Item'
import cloneDeep from 'clone-deep'

const SERVER_URI = ''

function App() {
  const [task, setTask] = useState('')
  const [listItem, setListItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Get data from server
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(SERVER_URI)
        setListItem(response.data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
      }
    }
    getData()
  }, [])

  const handleAddItem = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      SERVER_URI,
      { content: task },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    if (response.status === 400) return
    const newTask = response.data

    // use previous state instead of using filter
    setListItem((tasks) => [...tasks, newTask])
    setTask('')
  }

  const handleUpdateItem = async (id, task) => {
    const copyItems = cloneDeep(listItem)
    const oldTask = listItem.find((task) => task._id == id)
    const newTask = cloneDeep(oldTask)
    newTask.body = task
    const index = listItem.indexOf(oldTask)
    copyItems[index] = newTask

    //Prevent sending request if new task is the same as old task
    if (JSON.stringify(listItem) === JSON.stringify(copyItems)) {
      return
    } else {
      setListItem(copyItems)
      await axios.put(
        SERVER_URI,
        { id: id, content: task },
        { headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  const handleDeleteItem = async (id) => {
    const otherTask = listItem.filter((task) => task._id !== id)
    setListItem(otherTask)
    await axios.delete(
      SERVER_URI,
      { data: { id } },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const handleDeleteAll = async (e) => {
    e.preventDefault()
    setListItem([])
    await axios.delete(`${SERVER_URI}/delete-all`)
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='relative flex min-h-[600px] md:min-h-[700px] w-[320px] justify-center rounded-3xl bg-[#ffeaa7] md:w-[500px]'>
        <h1 className='absolute top-[30px] text-3xl font-bold'>To Do List</h1>

        {/* Loading state */}
        {isLoading ? (
          !error ? (
            <p className='self-center justify-self-center'>Loading Data...</p>
          ) : (
            <p className='self-center justify-self-center'>{error}</p>
          )
        ) : listItem.length === 0 ? (
          <p className='self-center justify-self-center'>No Data</p>
        ) : (
          <ul className='absolute top-20 flex max-h-[360px] w-5/6 flex-col gap-3 overflow-y-auto overflow-x-hidden md:max-h-[528px] md:w-[400px]'>
            {listItem.map((item) => (
              <Item
                key={item._id}
                task={item.body}
                onRemove={() => handleDeleteItem(item._id)}
                onSave={(task) => handleUpdateItem(item._id, task)}
              />
            ))}
          </ul>
        )}

        <form className='absolute bottom-[30px] w-5/6 flex-col md:h-[48px] md:w-[400px] md:flex-row'>
          <input
            id='toDoInput'
            className='mb-3 w-full rounded-3xl p-3 md:mb-0 md:mr-[21px] md:w-5/12'
            type='text'
            placeholder='Type here...'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          {/* Validate Task */}
          <span className='flex justify-evenly md:inline-block md:space-x-3'>
            {task === '' ? (
              <button
                disabled
                className='rounded-3xl bg-slate-500 p-3 font-bold'
              >
                Add to list
              </button>
            ) : (
              <button
                type='submit'
                onClick={handleAddItem}
                className='rounded-3xl bg-white p-3 font-bold transition hover:bg-[#fdcb6e]'
              >
                Add to list
              </button>
            )}

            {/* Check if has no item to prevent sending delete request */}
            {listItem.length === 0 ? (
              <button
                className='rounded-3xl bg-white p-3 font-bold transition hover:bg-[#fdcb6e]'
                disabled
              >
                Delete All
              </button>
            ) : (
              <button
                onClick={handleDeleteAll}
                className='rounded-3xl bg-white p-3 font-bold transition hover:bg-[#fdcb6e]'
              >
                Delete All
              </button>
            )}
          </span>
        </form>
      </div>
    </div>
  )
}

export default App
