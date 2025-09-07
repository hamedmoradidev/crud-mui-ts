import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import dialogContext from "../contexts/DialogContext.tsx";
import { useNavigate } from "react-router-dom";
interface MoreMenuButtonProps {
  postID: number;
}
export default function MoreMenuButton({ postID }: MoreMenuButtonProps) {
  const navigate = useNavigate();
  const { handleClickOpen } = useContext(dialogContext);
  const { setPostId } = useContext(dialogContext);
  const { openEditModal } = useContext(dialogContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { openViewModal } = useContext(dialogContext);
  const HandleDeletePost = () => {
    setPostId(postID);
    navigate(`/posts/${postID}/delete/`);
  };
  const HandleViewPost = () => {
    setPostId(postID);
    navigate(`/posts/${postID}/view/`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditPost = () => {
    setPostId(postID);
    navigate(`/posts/${postID}/edit/`);
    openEditModal();
  };
  return (
    <>
      <IconButton
        aria-label="more options"
        aria-controls={open ? "more-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            HandleViewPost();
            openViewModal();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleEditPost();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleClickOpen();
            HandleDeletePost();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
