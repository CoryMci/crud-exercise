export default function Modal({ children, close }) {
  return (
    <div
      className="fixed w-screen h-screen z-50 bg-black bg-opacity-30 shadow-md flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
