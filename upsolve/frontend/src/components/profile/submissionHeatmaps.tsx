"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import { LeetCodeProfile } from "../../types/leetcode";
import { fromUnixTime, format, subYears } from "date-fns";
import { useMemo } from "react";

interface Props {
  profileData: LeetCodeProfile;
}

export default function SubmissionHeatmap({ profileData }: Props) {
  const calendar = JSON.parse(profileData.submissionCalendar);

  const values = useMemo(
    () =>
      Object.entries(calendar).map(([timestamp, count]) => ({
        date: format(fromUnixTime(Number(timestamp)), "yyyy-MM-dd"),
        count: Number(count),
      })),
    [calendar]
  );

  // Green gradient theme
  const heatmapStyle = `
    .react-calendar-heatmap {
        font-family: system-ui, sans-serif;
        width: 100%;
        height: auto;
    }
    .react-calendar-heatmap text {
        font-size: 10px;
        fill: #9ca3af; /* neutral label */
    }
    .react-calendar-heatmap .react-calendar-heatmap-month-label {
        font-size: 12px;
    }
    .react-calendar-heatmap-weekday-label {
        font-size: 11px;
    }
    .react-calendar-heatmap rect {
        rx: 2;
        ry: 2;
    }

    .color-empty { fill: #1e293b; }
    .color-level-1 { fill: #166534; }
    .color-level-2 { fill: #22c55e; }
    .color-level-3 { fill: #4ade80; }
    .color-level-4 { fill: #bbf7d0; }

    /* Tooltip Styling */
    .__react_component_tooltip {
        background-color: #0f172a !important;
        border: 1px solid #374151 !important;
        border-radius: 6px !important;
        font-weight: 500 !important;
        color: #f8fafc !important;
    }

    /* Responsive sizing */
    @media (max-width: 640px) {
        .react-calendar-heatmap text {
            font-size: 8px;
        }
        .react-calendar-heatmap .react-calendar-heatmap-month-label {
            font-size: 10px;
        }
    }
    
    @media (min-width: 1024px) {
        .react-calendar-heatmap text {
            font-size: 11px;
        }
        .react-calendar-heatmap .react-calendar-heatmap-month-label {
            font-size: 13px;
        }
    }
  `;

  const endDate = new Date();
  const startDate = subYears(endDate, 1);

  return (
    <div className="text-gray-200">
      <style>{heatmapStyle}</style>
      <h3 className="text-xl font-semibold text-white mb-2">Submission Heatmap</h3>
      <p className="text-gray-400 mb-6">Your coding activity over the last year.</p>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] lg:min-w-[700px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            gutterSize={4}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count >= 12) return "color-level-4";
              if (value.count >= 8) return "color-level-3";
              if (value.count >= 4) return "color-level-2";
              return "color-level-1";
            }}
            showWeekdayLabels
          />
        </div>
      </div>
      <ReactTooltip id="heatmap-tooltip" />

      {/* Legend */}
      <div className="flex justify-end items-center gap-2 mt-4 text-sm text-gray-400">
        <span>Less</span>
        <div className="w-4 h-4 rounded-sm bg-[#166534]"></div>
        <div className="w-4 h-4 rounded-sm bg-[#22c55e]"></div>
        <div className="w-4 h-4 rounded-sm bg-[#4ade80]"></div>
        <div className="w-4 h-4 rounded-sm bg-[#bbf7d0]"></div>
        <span>More</span>
      </div>
    </div>
  );
}
