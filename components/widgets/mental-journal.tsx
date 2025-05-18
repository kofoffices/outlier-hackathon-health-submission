"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Plus, Tag, Settings, Save, Edit3, Trash2, Eye } from "lucide-react" // Added more icons
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // For theme settings
import { RetroWindow } from "@/components/ui/retro-window"
import { Separator } from "@/components/ui/separator" // For UI structure

// --- GAMIFICATION COMPONENTS ---
import InkCartridge from "@/components/gamification/InkCartridge"; // Adjust path

// --- TYPES ---
type JournalEntry = {
  id: string; // Changed to string for Date.now() or uuid
  date: string;
  title: string;
  content: string;
  tags: string[];
  theme?: string; // Store theme used for this entry
};

type JournalTheme = {
  id: string;
  name: string;
  fontClass: string; // e.g., 'font-pixel', 'font-mono-retro'
  bgColorClass: string; // For textarea background
  textColorClass: string; // For textarea text
  unlocked: boolean;
  unlockCondition?: string; // e.g., "Log 5 entries"
};

// --- CONSTANTS ---
const MAX_INK = 100;
const INK_PER_ENTRY = 20;
const INK_REFILL_DAILY = 30; // Refill amount per day if logged in
const INK_REFILL_STREAK_BONUS = 10; // Extra refill for logging streaks

const DEFAULT_THEMES: JournalTheme[] = [
  { id: "classic", name: "Classic Terminal", fontClass: "font-mono", bgColorClass: "bg-black", textColorClass: "text-green-400", unlocked: true },
  { id: "paper", name: "Dot Matrix", fontClass: "font-pixel", bgColorClass: "bg-slate-100", textColorClass: "text-slate-800", unlocked: true },
  { id: "rose", name: "Rose Tinted", fontClass: "font-sans", bgColorClass: "bg-rose-50", textColorClass: "text-rose-800", unlocked: false, unlockCondition: "Log 3 entries" },
  { id: "ocean", name: "Deep Ocean", fontClass: "font-mono", bgColorClass: "bg-blue-900", textColorClass: "text-blue-200", unlocked: false, unlockCondition: "Log 7 entries & 3-day streak" },
];

// ... (tagSuggestions - no change from your code)
const tagSuggestions = ["Positive", "Negative", "Neutral", "Morning", "Evening", "Work", "Personal", "Health", "Relationships", "Goals", "Stress", "Relaxed", "Anxious", "Happy", "Sad", "Excited", "Tired", "Energetic", "Grateful", "Frustrated"];


export function MentalJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null); // For reading an entry
  const [editingEntry, setEditingEntry] = useState<Partial<JournalEntry> | null>(null); // For new or editing existing
  
  const [currentInk, setCurrentInk] = useState(MAX_INK);
  const [journalThemes, setJournalThemes] = useState<JournalTheme[]>(DEFAULT_THEMES);
  const [activeThemeId, setActiveThemeId] = useState<string>(DEFAULT_THEMES.find(t => t.unlocked)?.id || "classic");
  const [journalingStreak, setJournalingStreak] = useState(0); // Days in a row with at least one entry
  const [lastLogDate, setLastLogDate] = useState<string | null>(null);

  const { toast } = useToast();

  // --- LOAD & SAVE DATA ---
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    else setEntries([]); // Start empty if nothing saved

    const savedInk = localStorage.getItem("journalInk");
    if (savedInk) setCurrentInk(parseInt(savedInk, 10));

    const savedThemes = localStorage.getItem("journalThemes");
    if (savedThemes) setJournalThemes(JSON.parse(savedThemes));
    
    const savedActiveTheme = localStorage.getItem("journalActiveTheme");
    if (savedActiveTheme) setActiveThemeId(savedActiveTheme);

    const savedStreak = localStorage.getItem("journalingStreak");
    if (savedStreak) setJournalingStreak(parseInt(savedStreak, 10));

    const savedLastLog = localStorage.getItem("journalLastLogDate");
    if (savedLastLog) setLastLogDate(savedLastLog);

  }, []);

  // Save to localStorage when states change
  useEffect(() => { localStorage.setItem("journalEntries", JSON.stringify(entries)); }, [entries]);
  useEffect(() => { localStorage.setItem("journalInk", currentInk.toString()); }, [currentInk]);
  useEffect(() => { localStorage.setItem("journalThemes", JSON.stringify(journalThemes)); }, [journalThemes]);
  useEffect(() => { localStorage.setItem("journalActiveTheme", activeThemeId); }, [activeThemeId]);
  useEffect(() => { localStorage.setItem("journalingStreak", journalingStreak.toString()); }, [journalingStreak]);
  useEffect(() => { if(lastLogDate) localStorage.setItem("journalLastLogDate", lastLogDate); }, [lastLogDate]);


  // --- INK & THEME UNLOCK LOGIC ---
  const checkThemeUnlocks = useCallback(() => {
    let hasChanged = false;
    const updatedThemes = journalThemes.map(theme => { // Reads journalThemes
      if (theme.unlocked) return theme;
      let newUnlockedState = theme.unlocked;
      if (theme.id === "rose" && entries.length >= 3) newUnlockedState = true;
      if (theme.id === "ocean" && entries.length >= 7 && journalingStreak >= 3) newUnlockedState = true;

      if (newUnlockedState !== theme.unlocked) {
        hasChanged = true;
        return { ...theme, unlocked: newUnlockedState };
      }
      return theme;
    });
    if (hasChanged) {
      setJournalThemes(updatedThemes); // Potentially updates journalThemes
    }
  }, [entries.length, journalingStreak, journalThemes]); // Depends on journalThemes

  // ...


  // Daily Ink Refill & Streak Management
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (lastLogDate !== todayStr) { // First login of the day (or after a day without login)
        setCurrentInk(prevInk => Math.min(MAX_INK, prevInk + INK_REFILL_DAILY + (journalingStreak > 0 ? INK_REFILL_STREAK_BONUS : 0) ));
        
        // Check if streak is broken
        if (lastLogDate) {
            const lastDate = new Date(lastLogDate);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastDate.toISOString().split('T')[0] !== yesterday.toISOString().split('T')[0]) {
                setJournalingStreak(0); // Streak broken
            }
        }
    }
    checkThemeUnlocks(); // Check unlocks whenever entries or streak might change
  }, [lastLogDate, journalingStreak, checkThemeUnlocks]); // Added checkThemeUnlocks


  // --- CRUD & UI HANDLERS ---
  const handleNewEntryClick = () => {
    if (currentInk < INK_PER_ENTRY && currentInk > 0) {
        toast({ title: "Low Ink!", description: `You need ${INK_PER_ENTRY} ink to write. Current: ${currentInk}. Ink refills daily!`, variant: "destructive"});
        return;
    }
    if (currentInk === 0) {
         toast({ title: "Out of Ink!", description: `Wait for daily refill or complete tasks!`, variant: "destructive"});
        return;
    }
    setEditingEntry({ title: "", content: "", tags: [], theme: activeThemeId });
    setViewingEntry(null); // Close reading view if open
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry({...entry, tags: entry.tags || [] }); // Ensure tags is an array
    setViewingEntry(null);
  };

  const handleViewEntry = (entry: JournalEntry) => {
    setViewingEntry(entry);
    setEditingEntry(null); // Close editing view
  }

  const handleDeleteEntry = (id: string) => {
     if(window.confirm("Are you sure you want to delete this entry?")) {
        setEntries(prev => prev.filter(entry => entry.id !== id));
        toast({ title: "Entry Deleted", variant: "default"});
        if(viewingEntry?.id === id) setViewingEntry(null);
     }
  };

  const handleSaveEntry = () => {
    if (!editingEntry || !editingEntry.title || !editingEntry.content) {
      toast({ title: "Missing Info", description: "Title and content are required.", variant: "destructive" });
      return;
    }
    
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (editingEntry.id) { // Updating existing
      setEntries(prev => prev.map(e => e.id === editingEntry.id ? { ...e, ...editingEntry, date: new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" }) } as JournalEntry : e ));
      toast({ title: "Entry Updated!" });
    } else { // New entry
      const newEntryFull: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        title: editingEntry.title,
        content: editingEntry.content,
        tags: Array.isArray(editingEntry.tags) ? editingEntry.tags : ((editingEntry.tags as unknown as string || "").split(",").map(t => t.trim()).filter(t => t)),
        theme: editingEntry.theme || activeThemeId,
      };
      setEntries(prev => [newEntryFull, ...prev]);
      setCurrentInk(prev => Math.max(0, prev - INK_PER_ENTRY));
      
      // Update streak
      if (lastLogDate !== todayStr) {
          setJournalingStreak(prev => prev + 1);
      }
      setLastLogDate(todayStr);
      checkThemeUnlocks(); // Check after saving new entry
      toast({ title: "Entry Saved!" });
    }
    setEditingEntry(null);
  };

  const activeTheme = journalThemes.find(t => t.id === activeThemeId) || journalThemes[0];

  // --- UI RENDERING ---
  if (editingEntry) { // Writing/Editing Mode
    return (
      <RetroWindow title={editingEntry.id ? "Edit Journal Entry" : "New Journal Entry"} icon={<Edit3 className="h-4 w-4 text-rose-500"/>} variant="roseDeep" className={`transition-all duration-200 ${activeTheme.fontClass}`}>
        <div className={`p-4 ${activeTheme.bgColorClass} ${activeTheme.textColorClass} rounded-md min-h-[calc(100vh-200px)] flex flex-col`}>
          <Input
            placeholder="Entry Title"
            value={editingEntry.title || ""}
            onChange={(e) => setEditingEntry(prev => ({...prev!, title: e.target.value}))}
            className={`mb-3 text-xl font-bold bg-transparent border-0 border-b-2 ${activeTheme.textColorClass.includes("black") || activeTheme.textColorClass.includes("slate") || activeTheme.textColorClass.includes("rose-800") ? 'border-gray-400 focus:border-gray-700 placeholder-gray-500' : 'border-gray-600 focus:border-gray-300 placeholder-gray-400'} rounded-none px-1 py-2 focus:ring-0`}
          />
          <Textarea
            placeholder="Start writing your thoughts..."
            value={editingEntry.content || ""}
            onChange={(e) => setEditingEntry(prev => ({...prev!, content: e.target.value}))}
            className="flex-grow resize-none bg-transparent border-0 p-1 text-base focus:ring-0"
            rows={15}
          />
           <Input
            placeholder="Tags (comma separated)"
            value={Array.isArray(editingEntry.tags) ? editingEntry.tags.join(", ") : (editingEntry.tags || "")}
            onChange={(e) => setEditingEntry(prev => ({...prev!, tags: (e.target.value.split(",").map(t=>t.trim()) as unknown as string[])}))} // Simplified tag input for now
            className={`mt-3 text-sm bg-transparent border-0 border-b ${activeTheme.textColorClass.includes("black") || activeTheme.textColorClass.includes("slate") || activeTheme.textColorClass.includes("rose-800") ? 'border-gray-400 focus:border-gray-700 placeholder-gray-500' : 'border-gray-600 focus:border-gray-300 placeholder-gray-400'} rounded-none px-1 py-1 focus:ring-0`}
          />
          <div className="mt-4 flex justify-between items-center">
            <Button variant="ghost" onClick={() => setEditingEntry(null)} className="text-black hover:bg-opacity-20 hover:bg-gray-200 text-gray-200">Cancel</Button>
            <Button onClick={handleSaveEntry} className="bg-rose-500 hover:bg-rose-600 text-black font-bold shadow-md border border-rose-700"><Save className="h-4 w-4 mr-2"/>Save Entry</Button>
          </div>
        </div>
      </RetroWindow>
    );
  }
  
  if (viewingEntry) { // Reading Mode
    const entryTheme = journalThemes.find(t => t.id === viewingEntry.theme) || activeTheme;
    return (
       <RetroWindow title="View Journal Entry" icon={<Eye className="h-4 w-4 text-rose-500"/>} variant="roseDeep" className={`transition-all duration-200 ${entryTheme.fontClass}`}>
        <div className={`p-6 ${entryTheme.bgColorClass} ${entryTheme.textColorClass} rounded-md min-h-[calc(100vh-200px)]`}>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold">{viewingEntry.title}</h2>
                <p className="text-sm opacity-80">{viewingEntry.date}</p>
            </div>
            <Separator className={entryTheme.bgColorClass.includes("black") || entryTheme.bgColorClass.includes("blue") ? "bg-gray-600 my-3" : "bg-gray-300 my-3"}/>
            <div className="prose prose-sm whitespace-pre-wrap max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: viewingEntry.content.replace(/\n/g, '<br />') }}></div>
             {viewingEntry.tags && viewingEntry.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {viewingEntry.tags.map(tag => <Badge key={tag} variant="outline" className={`border-opacity-50 ${entryTheme.textColorClass}`}>{tag}</Badge>)}
                </div>
            )}
            <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setViewingEntry(null)} className={`hover:bg-opacity-20 ${entryTheme.textColorClass.includes("black") || entryTheme.textColorClass.includes("slate") || entryTheme.textColorClass.includes("rose-800") ? 'hover:bg-gray-500 text-gray-700' : 'hover:bg-gray-200 text-gray-200'}`}>Back to List</Button>
                <div>
                    <Button onClick={() => handleEditEntry(viewingEntry)} className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-md"><Edit3 className="h-4 w-4 mr-1"/>Edit</Button>
                    <Button onClick={() => handleDeleteEntry(viewingEntry.id)} className="bg-red-500 hover:bg-red-600 text-black font-bold shadow-md"><Trash2 className="h-4 w-4 mr-1"/>Delete</Button>
                </div>
            </div>
        </div>
       </RetroWindow>
    );
  }


  // Listing Mode (Default View)
  return (
    <RetroWindow title="Mental Journal" icon={<Brain className="h-4 w-4 text-rose-500" />} variant="rose" className="transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-grow">
            <p className="text-sm text-gray-700 font-bold">Recent Entries</p>
            <p className="text-xs text-gray-500">Reflect on your thoughts and feelings.</p>
        </div>
        <div className="flex items-center gap-2">
            <InkCartridge inkLevel={currentInk} maxInk={MAX_INK} />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="border-2 border-gray-800 bg-rose-100 hover:bg-rose-200"><Settings className="h-4 w-4 text-rose-600"/></Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-2 border-2 border-gray-800 shadow-md bg-white">
                    <p className="text-xs font-bold mb-1 text-gray-700">Journal Theme:</p>
                    {journalThemes.filter(t=>t.unlocked).map(theme => (
                        <Button key={theme.id} variant="ghost" size="sm" onClick={() => setActiveThemeId(theme.id)} className={`w-full justify-start mb-1 text-xs ${activeThemeId === theme.id ? 'bg-rose-200 font-bold' : 'hover:bg-rose-100'}`}>
                            <span className={`w-3 h-3 rounded-full mr-2 ${theme.bgColorClass} border border-gray-500`}></span> {theme.name}
                        </Button>
                    ))}
                    {journalThemes.filter(t=>!t.unlocked).length > 0 && <Separator className="my-1"/>}
                    {journalThemes.filter(t=>!t.unlocked).map(theme => (
                         <div key={theme.id} className="text-xs text-gray-500 p-1.5 opacity-70" title={theme.unlockCondition}> <span className={`w-3 h-3 rounded-full mr-2 inline-block ${theme.bgColorClass} border border-gray-500`}></span>{theme.name} (Locked)</div>
                    ))}
                </PopoverContent>
            </Popover>
            <Button size="sm" onClick={handleNewEntryClick} disabled={currentInk === 0} className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-black border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]"> <Plus className="h-4 w-4 mr-1" /> New Entry </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
        {entries.length > 0 ? entries.map((entry) => (
          <div key={entry.id} className="p-3 rounded-md border-2 border-gray-800 hover:border-rose-400 hover:bg-rose-50 transition-all duration-200 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.7)]">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-800 cursor-pointer hover:text-rose-600" onClick={()=>handleViewEntry(entry)}>{entry.title}</h4>
              <p className="text-xs text-gray-600 font-semibold">{entry.date}</p>
            </div>
            <p className="text-sm text-gray-700 mb-2 line-clamp-2 font-medium">{entry.content.substring(0,150)}...</p>
            <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                    {entry.tags.slice(0,3).map((tag) => <Badge key={tag} variant="outline" className="text-xs bg-rose-100 text-rose-700 border-rose-300 font-semibold">{tag}</Badge>)}
                    {entry.tags.length > 3 && <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-300">+{entry.tags.length-3} more</Badge>}
                </div>
                <div>
                    <Button variant="ghost" size="sm" onClick={() => handleEditEntry(entry)} className="text-xs text-yellow-600 hover:bg-yellow-100"><Edit3 className="h-3.5 w-3.5 mr-1"/>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteEntry(entry.id)} className="text-xs text-red-600 hover:bg-red-100"><Trash2 className="h-3.5 w-3.5 mr-1"/>Delete</Button>
                </div>
            </div>
          </div>
        )) : (
            <p className="text-center text-gray-500 py-10 font-pixel">Your mind is a garden. Time to plant some thoughts!</p>
        )}
      </div>
      {/* Mood Trends - Simplified for now, can be expanded */}
      {/* <div className="mt-4 pt-4 border-t-2 border-gray-300"> ... </div> */}
    </RetroWindow>
  );
}