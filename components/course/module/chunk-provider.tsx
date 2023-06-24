"use client";

import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import ModuleView from "./module-view";
import axios from "axios";

export interface Chunk {
  id: number;
  title: string;
  content_path: string;
  rank: number;
  unit_module_id: number;
  content: string;
}

export interface ViewProps {
  isLoading: boolean;
  chunkIndex: number;
  setChunkIndex: Dispatch<SetStateAction<number>>;
  chunk: Chunk;
}

export default function ChunkProvider() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chunkIndex, setChunkIndex] = useState<number>(0);
  const [chunk, setChunk] = useState<Chunk>({
    id: -1,
    title: "",
    content_path: "",
    rank: -1,
    unit_module_id: -1,
    content: "",
  });

  const unitModule = useContext(UnitModuleContext);

  useEffect(() => {
    const fetchChunkData = async () => {
      setIsLoading(true);
      try {
        interface ChunkDetailResponse {
          data: {
            moduleChunk: Chunk;
          };
        }

        const response = (await axios.get(
          `/api/module-chunk/${unitModule.chunks[chunkIndex].id}`
        )) as ChunkDetailResponse;

        setChunk(response.data.moduleChunk);
      } catch (error) {
        setChunk({
          id: -1,
          title: "",
          content_path: "",
          rank: -1,
          unit_module_id: -1,
          content: "",
        });
      }
      setIsLoading(false);
    };

    fetchChunkData();
  }, [chunkIndex, unitModule.chunks]);

  return (
    <ModuleView
      isLoading={isLoading}
      chunkIndex={chunkIndex}
      setChunkIndex={setChunkIndex}
      chunk={chunk}
    />
  );
}
