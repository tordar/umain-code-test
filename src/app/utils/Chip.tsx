interface ChipProps {
    label: string
}

export default function Chip({ label }: ChipProps) {
    return (
        <div
            className="flex flex-row justify-center items-center px-3 py-2 bg-white rounded-full"
            style={{
                boxSizing: 'border-box',
                width: '81px',
                height: '28px',
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
              width: '57px',
              height: '12px',
              fontFamily: 'SF Pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '100%',
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


/*

/!* chips *!/

box-sizing: border-box;

/!* Auto layout *!/
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 8px;

width: 81px;
height: 28px;

/!* white *!/
background: #FFFFFF;
/!* stroke *!/
border: 0.6px solid rgba(0, 0, 0, 0.1);
/!* basic shadow *!/
box-shadow: -16px 9px 18px rgba(0, 0, 0, 0.01), -4px 2px 10px rgba(0, 0, 0, 0.01);
border-radius: 88px;

/!* Inside auto layout *!/
flex: none;
order: 0;
flex-grow: 0;


/!* Take-away *!/

width: 57px;
height: 12px;

font-family: 'SF Pro';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 100%;
/!* identical to box height, or 12px *!/
letter-spacing: -0.5px;

/!* black *!/
color: #000000;


/!* Inside auto layout *!/
flex: none;
order: 0;
flex-grow: 0;
*/
