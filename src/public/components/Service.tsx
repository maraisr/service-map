import styled, { css } from 'react-emotion';
import { IService } from '../types/Service';

const ItemStyled = styled.article`
	display: inline-block;
	padding: 25px;

	margin: 5px;

	width: calc(100% / 5);

	background-color: var(--color-danger);

	border-radius: 3px;

	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08),
		0 1px 3px 1px rgba(0, 0, 0, 0.16);

	&:not(:last-child) {
		margin-bottom: 10px;
	}
`;

const IsUpStyle = css`
	background-color: var(--color-success);
`;

const StyledHeader = styled.header`
	vertical-align: middle;
	font-size: 24px;
	text-align: center;
`;

const VersionStyle = css`
	vertical-align: middle;
	font-size: 50%;
`;

export const Service = (props: { item: IService }) => (
	<ItemStyled className={props.item.up ? IsUpStyle : ''}>
		<StyledHeader>
			{elpiseName(props.item.name)}{' '}
			<span className={VersionStyle}>({props.item.version})</span>
		</StyledHeader>
	</ItemStyled>
);

function elpiseName(name: string, length: number = 20) {
	return name.length > length ? `${name.slice(0, length)}...` : name;
}
