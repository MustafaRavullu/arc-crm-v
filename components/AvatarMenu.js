"use client";
export default function AvatarMenu() {
  return (
    <div className="flex flex-col p-3 gap-5">
      <div className="flex flex-col">
        <div className="font-bold">User</div>
        <div className="text-xs">user@example.com</div>
      </div>
      <button
        type="button"
        onClick={() => console.log("Çıkış Yap")}
        className="simple_button"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
