# WPM Typing Game Design Guidelines

## Design Approach
**Selected Approach:** Reference-Based (Utility-Focused)
Drawing inspiration from clean productivity tools like Linear and Notion, emphasizing clarity and focus for optimal typing performance.

**Key Design Principles:**
- Minimal distraction to maintain typing focus
- High contrast for character visibility
- Clean, spacious layout preventing eye strain
- Immediate visual feedback for performance tracking

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Background: 20 8% 12% (dark charcoal)
- Surface: 20 6% 16% (slightly lighter surface)
- Text primary: 0 0% 95% (near white)
- Text secondary: 0 0% 70% (muted gray)

**Feedback Colors:**
- Correct typing: 120 100% 40% (vibrant green)
- Incorrect typing: 0 85% 60% (clear red)
- Current position: 200 100% 70% (bright blue cursor)
- Accent/CTA: 260 100% 65% (purple for buttons)

### B. Typography
**Primary Font:** 'JetBrains Mono' (monospace for typing text)
**Secondary Font:** 'Inter' (for UI elements and stats)

**Text Hierarchy:**
- Typing text: 18px, line-height 1.6 for comfortable reading
- Statistics: 14px medium weight
- Timer: 24px bold for prominence
- Headings: 20px semibold

### C. Layout System
**Spacing Units:** Tailwind units 2, 4, 6, 8, 12, 16
- Component padding: p-6, p-8
- Element margins: m-4, m-6
- Grid gaps: gap-4, gap-6
- Container max-width: max-w-4xl

### D. Component Library

**Core Components:**
- **Typing Display Area:** Centered card with rounded corners, subtle border, large character spacing
- **Input Capture:** Invisible but functional, focus ring on typing area
- **Statistics Panel:** Grid layout showing WPM, Accuracy, Characters, Time in separate cards
- **Progress Indicators:** Subtle progress bars for completion percentage
- **Reset Button:** Primary purple button with rounded corners
- **Character Highlighting:** Smooth color transitions, clear visual states

**Navigation:** None needed - single-page focus app

**Data Displays:** 
- Real-time stat cards with large numbers
- Visual progress indicators
- Character-by-character highlighting overlay

### E. Animations
**Minimal Animation Strategy:**
- Smooth color transitions (0.2s) for character highlighting
- Gentle pulse on timer for urgency (final 10 seconds)
- Subtle hover states on reset button
- NO distracting animations during typing

## Layout Structure

**Single-Page Layout:**
1. **Header Section:** App title and brief instructions (h-16)
2. **Typing Area:** Large, centered text display with character highlighting (min-h-32)
3. **Statistics Bar:** Horizontal row of stat cards below typing area (h-20)
4. **Control Section:** Reset button and timer display (h-16)

**Responsive Considerations:**
- Mobile: Stack statistics vertically, reduce font sizes slightly
- Desktop: Horizontal stat layout, optimal character spacing
- Focus entirely on the typing experience across all devices

## Key UX Principles

**Focus-First Design:**
- Typing area is the visual centerpiece
- Minimal UI chrome to reduce distraction
- Clear visual hierarchy directing attention to active typing
- Immediate, unambiguous feedback for every keystroke

**Performance Clarity:**
- Large, readable statistics
- Color-coded performance indicators
- Clear completion states and final results
- Intuitive reset functionality for repeated practice

This design creates a distraction-free environment optimized for typing performance while providing clear, immediate feedback through strategic use of color and typography.