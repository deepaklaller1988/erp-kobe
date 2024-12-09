const Invite = () => {
  return (
    <div className="py-5 gap-2 flex">
      <h1>
        Enter Shipper Email ID
      </h1>
      <div><input className="border-2 rounded-md px-2" type="text" name="email" placeholder="Email id"/></div>
      <div><button className="border-2 px-2 rounded-md hover:bg-blue-600">Send</button></div>
    </div>
  )
}

export default Invite