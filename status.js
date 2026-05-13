// ----------------------------------------------------
// DYNAMIC STATUS CONFIGURATION
// ----------------------------------------------------
// 1. Create a public GitHub Gist at https://gist.github.com/
// 2. Name the file "status.txt" and type your status (e.g. "studying")
// 3. Click "Create public gist", then click the "Raw" button on the file.
// 4. Copy that URL and paste it between the quotes below:
const STATUS_GIST_URL = "https://gist.githubusercontent.com/myst-25/cf3bbd79184e1ad08db084d6bca308d6/raw";

// These are your configured status types. 
// If your Gist text matches a key below (like "busy"), it will use these settings.
// If your Gist text does NOT match (e.g. you type "Traveling"), it will just display "Traveling" in Grey.
const STATUS_CONFIG = {
    "available": {
        "active": true, // This is the fallback if GIST_URL is empty
        "text": "Available",
        "color": "#10b981" // Emerald Green
    },
    "busy": {
        "active": false,
        "text": "Busy",
        "color": "#ef4444" // Red
    },
    "working on self": {
        "active": false,
        "text": "Working on self",
        "color": "#3b82f6" // Blue
    },
    "studying": {
        "active": false,
        "text": "Studying",
        "color": "#f59e0b" // Amber/Yellow
    }
};
