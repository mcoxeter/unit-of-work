export interface FlexProps {
  children: React.ReactNode;
  direction?: 'Row' | 'Column';
  gap?: 4 | 8 | 12;
}
export const Flex = ({
  direction: type = 'Row',
  gap = 8,
  children
}: FlexProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: type === 'Row' ? 'row' : 'column',
        gap: `${gap}px`
      }}
    >
      {children}
    </div>
  );
};
