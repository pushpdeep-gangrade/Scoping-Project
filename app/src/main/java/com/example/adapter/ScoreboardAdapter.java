package com.example.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.model.Score;
import com.example.model.Scores;
import com.example.scopping.R;

import java.util.ArrayList;
import java.util.List;

import static androidx.recyclerview.widget.RecyclerView.*;

public class ScoreboardAdapter extends RecyclerView.Adapter<ScoreboardAdapter.MyViewHolder> {
    private List<Scores> teamsDataset;
    private int count = 1;

    public ScoreboardAdapter(List<Scores> teams) {
        teamsDataset = teams;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);
        View contactView = inflater.inflate(R.layout.scoreboard_item, parent, false);

        // Return a new holder instance
        MyViewHolder viewHolder = new MyViewHolder(contactView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Scores t = (Scores) teamsDataset.get(position);

        int rank = count++;
        holder.id.setText(Integer.toString(rank));
        holder.name.setText(t.getTeamname());
        holder.score.setText(Double.toString(t.getScore()));
    }

    @Override
    public int getItemCount() {
        return teamsDataset.size();
    }

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class MyViewHolder extends ViewHolder {
        // each data item is just a string in this case
        public TextView id;
        public TextView name;
        public TextView score;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            id = itemView.findViewById(R.id.teamId);
            name = itemView.findViewById(R.id.tvTeamName);
            score = itemView.findViewById(R.id.tvTeamScore);
        }
    }
}

