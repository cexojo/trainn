import * as React from "react";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: any[];
}

/**
 * Type declaration for the CommandPalette component.
 */
export declare function CommandPalette(props: CommandPaletteProps): React.ReactElement | null;
