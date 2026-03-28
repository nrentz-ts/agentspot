import { Suspense } from "react";
import { ChatContainer } from "@/components/chat/chat-container";

export default function AssistantPage() {
  return (
    <div className="h-full">
      <Suspense>
        <ChatContainer />
      </Suspense>
    </div>
  );
}
