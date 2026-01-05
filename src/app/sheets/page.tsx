import { Plus } from "lucide-react";
import { getMusicXMLExamples } from "./actions";
import { Button } from "@/components/ui/button";
import { SheetsContainer } from "./components/SheetsContainer";

export default async function Sheet() {
  const sheets = await getMusicXMLExamples();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/95">
      <SheetsContainer initialSheets={sheets} />

      {/* Floating Add Sheet Button - Refined */}
      <Button
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Add new sheet"
      >
        <Plus className="h-5 w-5" />
      </Button>

      {/* Animation is defined in global CSS */}
    </div>
  );
}
