import type {FC, SVGProps} from 'react';

type I18NextLogoProps = (
  | {height?: never; width?: number}
  | {height?: number; width?: never}
) &
  Omit<SVGProps<SVGSVGElement>, 'height' | 'width'>;

const I18NextLogo: FC<I18NextLogoProps> = ({
  className,
  height,
  width,
  ...props
}) => {
  const adjustedWidth = height ?? width ?? 64;
  const adjustedHeight = width ?? height ?? 64;

  return (
    <svg
      height={adjustedHeight}
      version="1.1"
      viewBox="0 0 64 64"
      width={adjustedWidth}
      {...props}
    >
      <defs />
      <g transform="matrix(0.29266863,0,0,0.29266863,8.3334108,-12.320112)">
        <g transform="matrix(1.5849745,0,0,1.5849745,-33.159906,-17)">
          <g>
            <path
              d="m 88.822,51.582 v 25.966 l 29.179,74.943 c 0,0 8.908,18.303 -16.57,22.763 H 43.308 c 0,0 -23.747,-2.478 -18.054,-21.281 L 55.918,77.549 V 51.582 Z"
              fill="#009688"
            />
            <g>
              <g>
                <path
                  d="M 89.438,48.563 H 54.435 c -2.835,0 -5.141,-2.522 -5.141,-5.638 0,-3.118 2.305,-5.64 5.141,-5.64 h 35.003 c 2.848,0 5.15,2.522 5.15,5.64 0,3.116 -2.303,5.638 -5.15,5.638 z"
                  fill="#004d40"
                />
              </g>
            </g>
            <path
              d="m 80.204,93.979 c 3.756,0 6.819,3.67 6.819,8.215 0,4.525 -3.065,8.204 -6.819,8.204 -3.765,0 -6.819,-3.679 -6.819,-8.204 0,-4.547 3.054,-8.215 6.819,-8.215 z"
              fill="#ffffff"
            />
            <ellipse
              cx="59.271"
              cy="108.362"
              fill="#ffffff"
              rx="5.7480001"
              ry="6.928"
            />
            <path
              d="m 91.417,75.827 v -12.35 c 0,0 15.661,-3.453 23.488,14.763 0,-10e-4 -12.198,8.887 -23.488,-2.413 z"
              fill="#004d40"
            />
            <path
              d="m 53.059,75.827 v -12.35 c 0,0 -15.663,-3.453 -23.486,14.763 0,-10e-4 12.186,8.887 23.486,-2.413 z"
              fill="#004d40"
            />
            <path
              d="m 100.833,126.935 c -25.467,-7.9 -46.878,-3.659 -57.343,-0.453 l -10.553,25.401 c -4.751,15.164 15.087,17.157 15.087,17.157 h 48.545 c 21.279,-3.595 13.842,-18.347 13.842,-18.347 z"
              fill="#ffffff"
            />
            <path
              d="m 64.131,136.373 c 0,2.739 -3.681,4.967 -8.215,4.967 -4.534,0 -8.204,-2.229 -8.204,-4.967 0,-2.75 3.67,-4.97 8.204,-4.97 4.536,0.002 8.215,2.22 8.215,4.97 z"
              fill="#004d40"
            />
            <path
              d="m 93.345,136.373 c 0,2.739 -3.681,4.967 -8.204,4.967 -4.547,0 -8.215,-2.229 -8.215,-4.967 0,-2.75 3.668,-4.97 8.215,-4.97 4.525,0.002 8.204,2.22 8.204,4.97 z"
              fill="#004d40"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default I18NextLogo;