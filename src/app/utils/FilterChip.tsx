interface FilterChipProps {
    label: string
}

export default function FilterChip({ label }: FilterChipProps) {
    return (
        <div
            className="inline-flex justify-center py-2 px-3 mx-2 my-2 items-center bg-white rounded-lg"
            style={{
                boxSizing: 'border-box',
                border: '0.6px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '-16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01)',
                flex: 'none',
                order: 0,
                flexGrow: 0,
            }}
        >
          <span
              className="text-black"
              style={{
                  fontFamily: 'SF Pro, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '15px',
                  letterSpacing: '-0.5px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
              }}
          >
            {label}
          </span>
        </div>
    )
}

