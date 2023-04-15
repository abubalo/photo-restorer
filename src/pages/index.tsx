import Image from 'next/image'



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div>
      <h1 className="text-7xl font-bold">Best way to restore Image</h1>
      </div> 
      <div className="w-1/2 h-52 p-4 flex justify-center items-center border-dashed border-2 border-white rounded-md">
        <p>upload your file here</p>
      </div>
    </main>
  )
}
