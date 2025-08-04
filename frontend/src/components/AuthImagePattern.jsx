const AuthImagePattern = ({ title, subtitle }) => {
    return (
        //here check

        <div className="items-center ">
    <div className="hidden lg:flex h-full justify-center bg-base-200 p-12">
      <div className="max-w-md text-center pt-20">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>

      <div className="hidden">
        <div className="chat chat-start">
          <div className="chat-bubble w-52 h-24">can we chat here ?</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">absolutely yeah</div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default AuthImagePattern;