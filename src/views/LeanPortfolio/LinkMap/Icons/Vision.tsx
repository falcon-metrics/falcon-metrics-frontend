import { SvgIcon } from "@material-ui/core";
import { IconProps } from "../types/types";
const Vision = (props: IconProps) => {
    return (
        <SvgIcon style={{ cursor: props.cursor || 'auto', color: props.color || 'rgb(0%,70.588235%,100%)', fontSize: props.fontSize || 24 }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="surface1">
                    <path stroke='none' fillRule='nonzero' fillOpacity={1} d="M 18.140625 12.238281 L 22.390625 12.238281 C 23.148438 12.238281 23.808594 11.3125 23.808594 10.253906 L 23.808594 2.316406 C 23.808594 1.257812 23.148438 0.332031 22.390625 0.332031 L 18.140625 0.332031 C 17.855469 0.332031 17.667969 0.597656 17.667969 0.992188 L 17.667969 11.574219 C 17.667969 11.972656 17.855469 12.238281 18.140625 12.238281 Z M 18.140625 12.238281 " />
                    <path stroke='none' fillRule='nonzero' fillOpacity={1} d="M 1.609375 9.722656 L 7.085938 9.722656 L 7.085938 10.253906 C 7.085938 10.648438 7.277344 10.914062 7.558594 10.914062 L 7.84375 10.914062 L 7.84375 13.691406 L 3.496094 22.15625 C 3.496094 22.554688 3.496094 22.949219 3.78125 23.214844 C 3.96875 23.480469 4.253906 23.347656 4.441406 23.082031 L 8.695312 14.617188 L 10.109375 14.617188 L 10.109375 22.6875 C 10.109375 23.082031 10.300781 23.347656 10.582031 23.347656 C 10.867188 23.347656 11.054688 23.082031 11.054688 22.6875 L 11.054688 14.617188 L 12.566406 14.617188 L 16.820312 23.082031 C 17.007812 23.347656 17.292969 23.480469 17.480469 23.214844 C 17.667969 22.949219 17.761719 22.554688 17.574219 22.289062 L 13.230469 13.824219 L 13.230469 11.046875 L 16.722656 11.046875 L 16.722656 1.789062 L 7.65625 1.789062 C 7.371094 1.789062 7.183594 2.050781 7.183594 2.449219 L 7.183594 2.976562 L 1.609375 2.976562 C 0.851562 2.976562 0.191406 3.902344 0.191406 4.960938 L 0.191406 7.871094 C 0.191406 8.929688 0.851562 9.722656 1.609375 9.722656 Z M 1.609375 9.722656 " />
                </g>
            </svg>
        </SvgIcon>
    );
};

export default Vision;